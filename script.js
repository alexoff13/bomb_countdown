let btn_start = document.getElementById("start")
let btn_reset = document.getElementById("reset")

function add_events(class_name, max_value, step) {
    document.getElementById(`up__${class_name}`).addEventListener("click",
        () => {
            counter = document.getElementById(`counter_${class_name}`)
            counter.textContent = (step + parseInt(counter.textContent, 10)) % max_value
        }
    );
    document.getElementById(`down__${class_name}`).addEventListener("click",
        () => {
            counter = document.getElementById(`counter_${class_name}`)
            if (counter.textContent === "0") {
                counter.textContent = max_value - step
            } else {
                counter.textContent = parseInt(counter.textContent, 10) - step
            }
        }
    );
}

function get_current_time() {
    let min = document.getElementById("counter_min")
    let sec = document.getElementById("counter_sec")
    let millisec = document.getElementById("counter_millisec")
    return [millisec, sec, min]
}


function decrease(counter, step, max_value) {
    if (counter.textContent === "0") {
        counter.textContent = max_value - step
    } else {
        counter.textContent = parseInt(counter.textContent, 10) - step
    }
}

function is_countdown_empty() {
    return get_current_time()[0].textContent === "0"
        && get_current_time()[1].textContent === "0"
        && get_current_time()[2].textContent === "0"
}

function decrease_timer(c) {
    let step = c ? 1 : 10
    let max_value = step === 1 ? 60 : 1000
    decrease(get_current_time()[c], step, max_value);
    +get_current_time()[c].textContent === max_value - step && c + 1 < 3 ? decrease_timer(c + 1) : null
}

function end() {
    clearInterval(count_interval)
    alert("Вы отчислены")
}

function start() {
    count_interval = setInterval(() => {
        is_countdown_empty() ? end() : decrease_timer(0)
    }, 11)

}

add_events("min", 60, 1)
add_events("sec", 60, 1)
add_events("millisec", 1000, 50)

btn_reset.addEventListener("click", () => {
    let counters = get_current_time()
    clearInterval(count_interval)
    for (let i = 0; i < counters.length; i++) {
        counters[i].textContent = 0
    }
})

btn_start.addEventListener("click", () => {
    start()
})