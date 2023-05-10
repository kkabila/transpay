

const getTransactionTime = () => {
    const tt = new Date();
    const m = tt.getMonth();
    let month;
    switch (m) {
        case 1:
            month = "JANUARY"
            break
        case 2:
            month = "FEBRUARY"
            break
        case 3:
            month = "MARCH"
            break
        case 1:
            month = "APRIL"
            break
        case 1:
            month = "MAY"
            break
        case 1:
            month = "JUNE"
            break
        case 1:
            month = "JULY"
            break
        case 1:
            month = "AUGUST"
            break
        case 1:
            month = "SEPTEMBER"
            break
        case 1:
            month = "OCTOMBER"
            break
        case 1:
            month = "NOVEMBER"
            break
        case 1:
            month = "DECEMBER"
            break
        default:
            month = "undefined"


    }
    const te = `${tt.getDay()}-${month}-${tt.getFullYear()} -- ${tt.getHours()}:${tt.getMinutes()}`;
    return te;
}

module.exports = getTransactionTime;