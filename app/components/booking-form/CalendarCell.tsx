import { cn } from "@/lib/utils";
import {
  CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";

// 解析以下代码
// 该文件定义了一个名为 CalendarCell 的 React 组件，用于渲染日历中的单元格。
// 组件接收四个参数：state、date、currentMonth 和 isUnavailable。
// state 是日历的状态，date 是单元格对应的日期，currentMonth 是当前显示的月份，isUnavailable 是一个可选参数，表示该日期是否不可用。
// 组件使用 useRef 创建了一个 ref，用于引用单元格的 DOM 元素。
// 使用 useCalendarCell 钩子获取单元格的属性、按钮属性、是否选中、是否禁用和格式化后的日期。
// 如果日期不可用，则覆盖 isDisabled 属性。
// 使用 useFocusRing 钩子获取焦点属性和焦点可见性。
// 通过 isSameMonth 函数判断日期是否在当前月份内。
// 通过 isToday 函数判断日期是否是今天。
// 渲染一个 <td> 元素，包含单元格的属性和样式。
// 渲染一个 <div> 元素，包含按钮属性、焦点属性和样式。
// 如果日期在当前月份内，则显示日期，否则隐藏。
// 根据不同的状态（如是否禁用、是否选中、是否今天）应用不同的样式。

export function CalendarCell({
  state,
  date,
  currentMonth,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  // Override isDisabled if the date is unavailable
  const finalIsDisabled = isDisabled || isUnavailable;

  const { focusProps, isFocusVisible } = useFocusRing();

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isDateToday = isToday(date, getLocalTimeZone());

  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="size-10 sm:size-12 outline-none group rounded-xl"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
            finalIsDisabled ? "text-muted-foreground cursor-not-allowed" : "",
            isFocusVisible ? "group-focus:z-2 ring-gray-12 ring-offset-1" : "",
            isSelected ? "bg-primary text-white" : "",
            !isSelected && !finalIsDisabled
              ? "hover:bg-blue-500/10 bg-secondary"
              : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              // MARK: - 当前日期Indicator
              className={cn(
                "absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
