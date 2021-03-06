(function ($, Drupal) {

    $(document).ready(function () {

        var calendar = $('#reserves-calendar');
        var popup = $('#add-booking-popup');
        var addEventForm = $('#reserves-bookings-create-booking');
        var sid = Drupal.settings.reserves.sid;
        var now = moment();
        var minDuration = Number(Drupal.settings.reserves.min_booking_time);
        var maxDuration = Number(Drupal.settings.reserves.max_booking_time);
        var granularity = Number(Drupal.settings.reserves.granularity);
        var maxSlots = Number(Drupal.settings.reserves.maxSlots);

        calendar.fullCalendar({
            defaultView: 'agendaWeek',
            validRange: function (nowDate) {
                return {
                    start: nowDate.clone().subtract(1, 'days'),
                    end: nowDate.clone().add(1, 'months')
                };
            },
            lang: "ca",
            firstDay: 1,
            editable: true,
            allDayText: 'Tot el dia',
            eventStartEditable: false,
            eventDurationEditable: false,
            forceEventDuration: true,
            selectable: true,
            selectMinDistance: 20,
            minTime: "08:00:00",
            maxTime: "22:00:00",
            businessHours: openingTimes(),
            selectConstraint: "businessHours",
            eventConstraint: "businessHours",
            eventOverlap: false,
            slotEventOverlap: false,
            selectOverlap: false,
            eventSources: [{
                url: '/espais/festes/' + sid + '/json',
                type: 'POST',
                color: 'yellow',
                data: {
                    type: 'holiday',
                },
            }, {
                url: '/espais/' + sid + '/json',
                type: 'POST',
            }],
            dayClick: function (date, jsEvent, view) {
                alert('Per seleccionar un interval de temps has de mantenir el botó esquerre del ratolí clicat i fer un moviment vertical');
            },
            eventResize: function (event, delta, revertFunc) {
                var duration = event.end.diff(event.start, 'minutes');
                console.log(duration);
                if (duration >= minDuration) {
                    if (duration <= maxDuration && duration % granularity == 0) {
                        popup.show();
                        scrollToForm();
                        addEventForm.find('#edit-date-start').val(event.start.format('H:mm'));
                        addEventForm.find('#edit-date-end').val(event.end.format('H:mm'));
                        addEventForm.find('#edit-booking-day').val(event.start.format('D/M/YYYY'));
                    } else {
                        revertFunc();
                    }

                } else {
                    revertFunc();
                }
            },
            select: function (start, final, jsEvent, view) {

                calendar.fullCalendar('removeEvents', 0);
                var duration = final.diff(start, 'minutes');
                var allDay = !start.hasTime() && !final.hasTime();

                var event = new Object();
                event.id = 0;
                event.start = start;
                event.title = "Nova reserva";
                event.description = "Omple el formulari per guardar-la";
                event.overlap = false;
                event.constraint = "businessHours";
                event.editable = true;
                event.startEditable = true;
                event.durationEditable = true;
                event.allDay = false;

                if (start >= now && !allDay) {
                    if (duration >= minDuration) {
                        if (duration % granularity == 0) {
                            event.end = final;
                        } else {
                            var newend = duration - granularity;
                            event.end = final.subtract(newend, 'minutes');
                        }
                        if (duration >= maxDuration) {
                            event.end = start.clone().add(maxDuration, 'minutes');
                        }

                        calendar.fullCalendar('renderEvent', event);
                        popup.show();

                        scrollToForm();

                        addEventForm.find('#edit-date-start').val(start.format('H:mm'));
                        addEventForm.find('#edit-date-end').val(event.end.format('H:mm'));
                        addEventForm.find('#edit-booking-day').val(start.format('D/M/YYYY'));

                    } else {
                        calendar.fullCalendar('unselect');
                        alert("La durada mínima de la reserva ha de ser de " + minDuration + " minuts.");
                    }
                } else {
                    calendar.fullCalendar('unselect');
                    alert('Les dates que has seleccionat ja han passat.');
                }

            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {

                addEventForm.find('#edit-date-start').val(event.start.format('H:mm'));
                addEventForm.find('#edit-date-start').value = event.start.format('H:mm');
                addEventForm.find('#edit-date-end').val(event.end.format('H:mm'));
                addEventForm.find('#edit-booking-day').val(event.start.format('D/M/YYYY'));

            },
            eventClick: function (event, jsEvent, view) {
                if (event.editable) {;
                    popup.show();
                    addEventForm.find('#edit-date-start').val(event.start.format('H:mm'));
                    addEventForm.find('#edit-date-start').value = event.start.format('H:mm');
                    addEventForm.find('#edit-date-end').val(event.end.format('H:mm'));
                    addEventForm.find('#edit-booking-day').val(event.start.format('D/M/YYYY'));
                    addEventForm.find('#edit-pax').html('');

                    if (event.pax) {
                        for (var i = 1; i < event.pax + 1; i++) {
                            addEventForm.find('#edit-pax').append('<option value=' + i + '>' + i + '</option>');
                        };
                    } else {
                        for (var i = 1; i < maxSlots + 1; i++) {
                            addEventForm.find('#edit-pax').append('<option value=' + i + '>' + i + '</option>');
                        };
                    }

                    scrollToForm();
                }

            },
            eventRender: function (event, element, view) {
                element.find('.fc-title').append('<div class="hr-line-solid-no-margin"></div><span style="font-size: 10px">' + event.description + '</span></div>');
                if (event.type == 'holiday') {
                    var start = event.start.format('YYYY-MM-DD');
                    $('.fc-day').each(function (index, el) {
                        if ($(this).data('date') == start) {
                            $(this).addClass('event-holiday');
                        }
                    });
                }
                if (event.start < now) {
                    element.addClass('event-old');
                    if (!element.hasClass('holiday')) {
                        element.find('.fc-title').text('Reserva passada');
                    }
                }
            },

        });

    });

    function openingTimes() {
        var openingTimes = convertOpeningTimes(Drupal.settings.reserves.times);
        return openingTimes;
    }

    function limitSelectOptions(slots) {
        var options = new Array();
        for (var i = slots.length - 1; i >= 0; i--) {
            var option = {
                i: slots[i],
            };
        };
        return options;
    }

    function convertOpeningTimes(times) {
        var openingTimes = new Array();
        for (var i = times.length - 1; i >= 0; i--) {
            var day = {
                dow: [times[i].day],
                start: times[i].starthours.substr(-4, times[i].starthours.length - 2) + ":" + times[i].starthours.substr(-2, 2),
                end: times[i].endhours.substr(-4, times[i].endhours.length - 2) + ":" + times[i].endhours.substr(-2, 2),
            };
            openingTimes.push(day);
        };
        return openingTimes;
    }

    function scrollToForm() {
        $('html, body').animate({
            scrollTop: $('#add-booking-popup').offset().top
        }, 1000);
    }

}(jQuery, Drupal));