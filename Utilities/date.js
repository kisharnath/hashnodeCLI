function DateUtc(){
    const currentDate = new Date();
    const currentDateTimeUTC = currentDate.toISOString();
    return currentDateTimeUTC
}
module.exports = {DateUtc}