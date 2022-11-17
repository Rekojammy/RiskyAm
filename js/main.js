$(function () {
    $("#addBtn").click(function () {
        let guesserName = $("#guesserName").val();
        let guesserNumber = $("#guesserNumber").val();
        if (guesserName === "" || guesserNumber === "") {
            $(".errmsg").css("color", "red");
            $(".errmsg").text("Fields Cannot be empty!");
            setTimeout(() => { $(".errmsg").text(".") }, 2000);
        } else {
            $(".errmsg").css("color", "green");
            $(".errmsg").text("Details Entered!");
            setTimeout(() => { $(".errmsg").text(".") }, 2000);
            $("#guess").append(`<div class="w-75 d-flex justify-content-between">
                                <p class="names">${guesserName}</p>
                                <p class="matched"><span class="match">0</span> Matched</p>
                                <p class="nums">${guesserNumber}</p>
                                </div>`);
            $("#guesserName").val("");
            $("#guesserNumber").val("");
        }
    })

    $("#removeBtn").click(function () {
        $("#guess div").last().remove();
    })

    let outcome = 0;
    $("#incr").click(function () {
        outcome++;
        $("#outcome").text(outcome);
    })

    $("#decr").click(function () {
        if (outcome < 1)
            return
        outcome--;
        $("#outcome").text(outcome);
    })

    $("#calculate").click(function () {
        let luckyNum = $("#luckyNum").val();
        let names = document.querySelectorAll('.names');
        let nums = document.querySelectorAll('.nums');
        let match = document.querySelectorAll('.match');
        let arr1 = []
        let arr2 = []

        names.forEach(element => {
            arr1.push(element.innerText)
        })

        nums.forEach(element => {
            arr2.push(element.innerText)
        })

        // const obj = arr1.reduce((accumulator, element, index) => {
        //     return { ...accumulator, [element]: arr2[index] };
        // }, {});
        // let numbers = Object.values(obj)
        // console.log(numbers);

        var c = 0;
        function count(str1, str2) {
            c = 0
            for (var i = 0; i < str2.length; i++) {
                if (str1.includes(str2[i]))
                    c += 1;
            }
        }

        arr2.forEach((element, index) => {
            count(luckyNum, element);
            match[index].innerText = c;
        });

        let arr3 = []
        match.forEach(elem => {
            if ($("#outcome").text() !== "0" && elem.innerText >= $("#outcome").text()) {
                let winner = elem.parentElement.parentElement.firstElementChild.innerText;
                arr3.push(winner)
            }
        })

        $("#resultWin").html("")
        arr3.forEach(element => {
            let result = `<p class="fw-bold">${element} Won!</p>`
            $("#resultWin").append(result);
        })

        let resultShow = document.querySelector('.resultModal');
        setTimeout(() => {
            if ($("#resultWin").html() == "")
                return
            else
                resultShow.classList.remove("d-none")
        }, 2000);

        setTimeout(() => {
            resultShow.classList.add("d-none")
        }, 7000);

    })

    $("#refresh").click(function () {
        $("#outcome").text("0");
        $("#luckyNum").val("");
        $("#guess").html("");
        outcome = 0;
    })
})