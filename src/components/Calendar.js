import PropTypes from 'prop-types';
import React from 'react';

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')


function Calendar({date}) {
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    const getCalendarMonth = date => {
        const start = moment(date).set({'month': month, 'date': 1}).set('day', 1);
        const end = moment(mDate).set({'month': month, 'date': 31}).set('day', 7);
        const weekInMonth = end.diff(start, 'weeks') + 1
        const calendar = []
        for (let i = 0; i < weekInMonth; i++) {
            const week = []
            for (let j = 0; j < 7; j++) {
                week.push(moment(start))
                start.add(1, 'day');
            }
            calendar.push(week);
        }
        return calendar;
    }

    const mDate = moment(date);
    const day = capitalize(mDate.format('dddd'));
    const dateNum = mDate.format('D');
    const month = capitalize(mDate.format('MMMM'))
    const year = mDate.format('YYYY')
    const calendar = getCalendarMonth(mDate);


    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{ day }</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{ dateNum }</div>
                    <div className="ui-datepicker-material-month">{ capitalize(mDate.format('LLLL').split(' ')[2]) }</div>
                    <div className="ui-datepicker-material-year">{ year }</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{ month }</span>&nbsp;<span className="ui-datepicker-year">{ year }</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>{
                    calendar[0].map((_, index) => <col key={ index } className={ index > 4 ? "ui-datepicker-week-end" : null }/>)
                }</colgroup>
                <thead>
                    <tr>{
                        calendar[0].map((el, index) => {
                            return (
                                <th key={ index } scope='col' title={ capitalize(el.format('dddd')) }>{
                                capitalize(el.format('dd'))
                                }</th>
                            )
                        })
                    }</tr>
                </thead>
                <tbody>{
                    calendar.map(week => {
                        return (
                            <tr key={ week[0].format('L').split('/') }>{
                                week.map(day => {
                                    let classDay;
                                    if (!day.isSame(mDate, 'month')) {
                                        classDay = "ui-datepicker-other-month";
                                    } else if (day.isSame(mDate)) {
                                        classDay = "ui-datepicker-today";
                                    } else {
                                        classDay = '';
                                    }
                                    return <td key={ day.format('L').split('/') } className={ classDay }>{ day.date() }</td>
                                })
                            }</tr>
                        )
                    })
                }</tbody>
            </table>
        </div>
    )
}

Calendar.propTypes = {
    date: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default Calendar;