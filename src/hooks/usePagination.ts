import { useState } from "react";
import { Course } from "../models/coursesPreviewModel";
import { useLocalStorage } from "./useLocalStorage";
import { TIME_TO_LIVE } from "../constants/TTL";

export function usePagination(courses: Course[], perPage: number, activePage: number) {

  const [coursesPerPage, setCoursesPerPage] = useState(perPage)
  const [currentPage, setCurrentPage] = useLocalStorage<number>('active-page-number', activePage, TIME_TO_LIVE.activePageNumber)

  const lastCourseIndex = currentPage * coursesPerPage
  const firstItemIndex = lastCourseIndex - coursesPerPage
  const currentCourses = courses.slice(firstItemIndex, lastCourseIndex)

  return {coursesPerPage, currentPage, setCurrentPage, currentCourses }
}