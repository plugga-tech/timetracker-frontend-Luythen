const ReadableTimer = (msI: number) => {
    var seconds = Math.floor((msI/1000)%60)
    var minutes = Math.floor((msI/(1000*60)%60))
    var houres = Math.floor((msI/(1000*60*60)%24))

    return `${houres}H : ${minutes}M : ${seconds}S`
}

export default ReadableTimer;