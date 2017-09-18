(function ($, Drupal) {

    $(document).ready(function () {

        var calendar = $('#reserves-calendar');
        var popup = $('#add-booking-popup');
        var addEventForm = $('#reserves-bookings-create-booking');
        var sid = Drupal.settings.reserves.sid;

        console.log(sid);

        calendar.fullCalendar({
            defaultView: 'agendaWeek',
            validRange: function (nowDate) {
                return {
                    start: nowDate.clone().subtract(1, 'days'),
                    end: nowDate.clone().add(1, 'months')
                };
            },
            //allDaySlot: false,
            //allDayText: false,
            firstDay: 1,
            editable: true,
            eventStartEditable: false,
            eventDurationEditable: false,
            forceEventDuration: true,
            selectable: true,
            //selectHelper: true,
            //unselectAuto: false,
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
            select: function (start, final, jsEvent, view) {

                console.log(jsEvent);

                calendar.fullCalendar('removeEvents', 0);

                var end = start.clone().add(2, 'hours');

                var event = new Object();
                event.id = 0;
                event.start = start;
                event.end = end;
                event.title = "Nova reserva";
                event.description = "Omple el formulari per guardar-la";
                event.overlap = false;
                event.constraint = "businessHours";
                event.editable = true;
                event.startEditable = true;

                var duration = start.clone().add(2, 'hour');

                if (duration <= final) {
                    calendar.fullCalendar('renderEvent', event);
                    popup.show();
                } else {
                    calendar.fullCalendar('unselect');
                }

                addEventForm.find('#edit-date-start').val(start.format('H:mm'));
                addEventForm.find('#edit-date-end').val(end.format('H:mm'));
                addEventForm.find('#edit-booking-day').val(start.format('D/M/YYYY'));

            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {

                console.log(event);

                addEventForm.find('#edit-date-start').val(event.start.format('H:mm'));
                addEventForm.find('#edit-date-start').value = event.start.format('H:mm');
                addEventForm.find('#edit-date-end').val(event.end.format('H:mm'));
                addEventForm.find('#edit-booking-day').val(event.start.format('D/M/YYYY'));

            },
            eventClick: function (event, jsEvent, view) {
                console.log(event);
                if (event.editable) {;
                    popup.show();
                    addEventForm.find('#edit-date-start').val(event.start.format('H:mm'));
                    addEventForm.find('#edit-date-start').value = event.start.format('H:mm');
                    addEventForm.find('#edit-date-end').val(event.end.format('H:mm'));
                    addEventForm.find('#edit-booking-day').val(event.start.format('D/M/YYYY'));
                    addEventForm.find('#edit-pax').html('');

                    for (var i = 1; i < event.pax + 1; i++) {
                        addEventForm.find('#edit-pax').append('<option value=' + i + '>' + i + '</option>');
                    };
                }

            },
            eventRender: function (event, element, view) {
                element.find('.fc-title').append('<div class="hr-line-solid-no-margin"></div><span style="font-size: 10px">' + event.description + '</span></div>');
                if (event.type == 'holiday') {
                    var start = event.start.format('YYYY-MM-DD');
                    $('.fc-day').each(function (index, el) {
                        if ($(this).data('date') == start) {
                            console.log($(this).data('date'));
                            $(this).css({
                                background: 'yellow',
                                cursor: 'not-allowed'
                            });;
                        }
                    });
                }
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
                console.log('test');
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

}(jQuery, Drupal));