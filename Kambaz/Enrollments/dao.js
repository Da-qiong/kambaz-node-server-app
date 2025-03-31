import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    Database.enrollments.push(newEnrollment);
    return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
    Database.enrollments = Database.enrollments.filter(
        e => !(e.user === userId && e.course === courseId)
    );
}

export function findEnrollmentsForUser(userId) {
    return Database.enrollments.filter(e => e.user === userId);
}

export const findEnrollmentsForCourse = (courseId) => {
    return Database.enrollments.filter(e => e.course === courseId);
};