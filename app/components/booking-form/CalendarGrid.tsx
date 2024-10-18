import { useCalendarGrid, AriaCalendarGridProps } from "@react-aria/calendar";
import { getWeeksInMonth, endOfMonth, DateValue, DateDuration } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { CalendarCell } from "./CalendarCell";
import { CalendarState } from "@react-stately/calendar";

// interface CalendarGridProps {
//   state: CalendarState;
//   offset?: DateValue; // DateValue represents date-related data from @internationalized/date
// }

export function CalendarGrid({ 
  state, 
  offset = {},
  isDateUnavailable
 }: {
  state: CalendarState;
  offset?: DateDuration;
  isDateUnavailable?: (date: DateValue) => boolean;
}) {

  // MARK: - 获取开始和结束
  let { locale } = useLocale();
  let startDate = state.visibleRange.start.add(offset);
  let endDate = endOfMonth(startDate);

  let { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
      weekLayout: "short",
      weekStart: 1,
    } as AriaCalendarGridProps, // Adding proper type for useCalendarGrid props
    state
  );

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(startDate, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1 transition-all duration-500">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state.getDatesInWeek(weekIndex, startDate).map((date, i) =>
              date ? (
                <CalendarCell
                  key={i}
                  state={state}
                  date={date}
                  currentMonth={startDate}
                  isUnavailable={isDateUnavailable?.(date)}
                />
              ) : (
                <td key={i} />
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}