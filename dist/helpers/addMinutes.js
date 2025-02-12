"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMinutesToDate = AddMinutesToDate;
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
}
//# sourceMappingURL=addMinutes.js.map