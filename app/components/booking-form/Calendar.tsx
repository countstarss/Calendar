"use client";

import { createCalendar } from "@internationalized/date";
import { CalendarProps, DateValue, useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

// 生成以下代码的解析
// 该文件定义了一个日历组件。它使用了多个来自 `react-aria` 和 `react-stately` 的钩子和组件来管理和渲染日历的状态和界面。

// `Calendar` 组件接受 `CalendarProps` 和一个可选的 `isDateUnavailable` 函数作为参数。

// `isDateUnavailable` 函数用于判断某个日期是否不可用。

// 在组件内部，首先通过 `useLocale` 钩子获取当前的语言环境，然后使用 `useCalendarState` 钩子创建日历状态。`useCalendarState` 钩子接受一个配置对象，其中包括组件的属性、可见的持续时间（默认为一个月）、语言环境和一个用于创建日历的函数。

// 接下来，通过 `useCalendar` 钩子获取日历的属性以及前后按钮的属性。

// 最后，组件返回一个包含日历头部和日历网格的 `div` 元素。`CalendarHeader` 组件用于渲染日历的头部，包括月份和年份的显示以及前后按钮。`CalendarGrid` 组件用于渲染日历的网格，显示具体的日期。

// 该组件的结构和样式通过类名进行控制，确保日历在界面上的正确显示。

export function Calendar(
  props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean;
  }
) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );
  return (
    <div {...calendarProps} className="inline-block min-h-[420px] mx-4 items-center select-none" >
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} isDateUnavailable={props.isDateUnavailable}/>
      </div>
    </div>
  );
}