(function ($, Drupal) {

    $(document).ready(function () {

        var calendar = $('#reserves-calendar');
        var popup = $('#add-booking-popup');
        var addEventForm = $('#reserves-ajax-booking-form');
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
            allDaySlot: false,
            allDayText: false,
            firstDay: 1,
            editable: true,
            //eventStartEditable: true,
            //eventDurationEditable: true,
            selectable: true,
            selectHelper: true,
            unselectAuto: false,
            minTime: "08:00:00",
            maxTime: "22:00:00",
            slotEventOverlap: false,
            selectOverlap: false,
            Duration: "00:60:00",
            defaultTimedEventDuration: "00:60:00",
            forceEventDuration: true,
            businessHours: openingTimes(),
            selectConstraint: "businessHours",
            eventConstraint: "businessHours",
            events: [{
                title: 'event3',
                start: new Date('2017-09-14T12:30:00'),
                id: 1,
            }],
            select: function (start, end) {
                console.log('Selected');
                popup.show();
                addEventForm.find('#edit-date-start').val(start.format('H:mm'));
                addEventForm.find('#edit-date-end').val(end.format('H:mm'));
                addEventForm.find('#edit-booking-day').val(start.format('D/M/YYYY'));
            },
            selectAllow: function (selectInfo) {
                var duration = moment.duration(selectInfo.end.diff(selectInfo.start));
                return duration.asHours() <= 2;
            },
            dayClick: function (date, jsEvent, view) {
                console.log('day is clicked');
                $('#add-booking-popup').show();
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
                console.log('test');
            },

        });

    });


    console.log(openingTimes());

    function openingTimes() {
        var openingTimes = convertOpeningTimes(Drupal.settings.reserves.times);
        return openingTimes;
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