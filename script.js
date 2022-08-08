const $exit = document.querySelector("#exit")
const $timer_modal = document.querySelector("#timer_modal")
const $button_revise = document.querySelector("#button_revise")

const $hour_select = document.querySelector("#hour_select")
const $minute_select = document.querySelector("#minute_select")
const $second_select = document.querySelector("#second_select")

const $modal_start = document.querySelector("#modal_start")

const $hour_timer = document.querySelector("#hour_timer") 
const $minute_timer = document.querySelector("#minute_timer") 
const $second_timer = document.querySelector("#second_timer") 

const $button_stop = document.querySelector("#button_stop")
const $button_start = document.querySelector("#button_start")
const $button_reset = document.querySelector("#button_reset")

let isTime = false
let time = 0
let curTime = 0
let interval = null

let audio = new Audio('./audio/alram.mp3');

$button_stop.addEventListener("click",() => {
    clearInterval(interval)
    $button_start.classList.remove("hidden")
    $button_stop.classList.add("hidden")
})

$button_start.addEventListener("click", () => {
    startTime()
})

$button_reset.addEventListener("click",() => {
    curTime = time;
    setTime(curTime)
})

$exit.addEventListener("click",() => {
    $timer_modal.classList.remove("show")
})

$button_revise.addEventListener("click", () => {
    $timer_modal.classList.add("show")
})

$modal_start.addEventListener("click",() => {
    time = 0
    
    time += parseInt($hour_select.value) *3600
    time += parseInt($minute_select.value) * 60
    time += parseInt($second_select.value)

    curTime = time

    if (interval) {
        clearInterval(interval)
    }
    setTime(curTime)
    startTime(time)
    $exit.click()
})

function init() {
    selectTagsInit()
}

function selectTagsInit() {
    selectTagInit(100,$hour_select)
    selectTagInit(60,$minute_select)
    selectTagInit(60,$second_select)
}

function selectTagInit(number,$target) {
    for(let i = 0 ; i < number ; i ++ ){
        const newOption = document.createElement("option")
        const number = i > 9 ? i : `0${i}`
        newOption.value = number
        newOption.innerText = number
        $target.append(newOption)
    }
}

function setTime(pTime) {
    hour = Math.floor(pTime / 3600)
    minute = Math.floor((pTime % 3600) / 60)
    second = Math.floor((pTime % 3600) % 60)
    
    $hour_timer.innerText = hour > 9 ? hour : `0${hour}`
    $minute_timer.innerText = minute > 9 ? minute : `0${minute}`
    $second_timer.innerText = second > 9 ? second : `0${second}`
}

function startTime () {

    $button_start.classList.add("hidden")
    $button_stop.classList.remove("hidden")

    interval = setInterval(() => {
        // 시간을 업데이트 해준다.
        if (curTime === 0) {
            audio.play()
            clearInterval(interval)
        }
        
        setTime(curTime)

        curTime -= 1
        
    },1000)
} 

init()