window.onload = function(){
    // global selector
    let currentDay = document.querySelector(".current-day");
    let select = document.querySelector("#select")
    let text = document.querySelector(".text")
    let number = document.querySelector(".number")
    let submit = document.querySelector(".submit")
    let navList = document.querySelector(".nav-list");
    let income = document.querySelector(".income");
    let balance = document.querySelector(".balance");
    let expense = document.querySelector(".expense");
    let list = [0,0];
    // function for selecting element
    let selectElement = (s) => document.querySelector(s);

    selectElement(".touch").addEventListener("click", () => {
      selectElement(".input").classList.add("active");
    });
    selectElement(".back").addEventListener("click", () => {
      selectElement(".input").classList.remove("active");
    });

    function chart(list){
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Income", "Expense"],
            datasets: [
              {
                label: "# of Votes",
                data: list,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
        chart.update();
    }




    // array for days and months
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      " May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setInterval(() => {
      let currDate = new Date();
      let day = currDate.getDay();
      let hour = currDate.getHours();
      let minute = currDate.getMinutes();
      currentDay.innerHTML = `${hour}:${minute} ${days[day]}`;
    }, 1000);
    // adding data on history
    function addExpense(inputSelect, inputText, inputNumber) {
        let currDate = new Date();
        let date = currDate.getDate();
        let month = currDate.getMonth();
        let newInputNumber;
        if(inputSelect == 'Expenses'){
            newInputNumber = `-${inputNumber}`
        }
        else{
            newInputNumber = `${inputNumber}`;
        }
      let madeList = `
        <li class="nav-items">
                    <div class="head">
                        <h4 class="current-time" >${months[month]} ${date}</h4>
                        <p class="${inputSelect}" >${inputSelect}: <span>${newInputNumber}</span></p>
                    </div>
                    <div class="history">
                        <div class="history-content">
                            <h3>${inputText}</h3>
                        </div>
                        <div class="delete">
                            <i class="fas fa-trash-alt del"></i>
                        </div>
                    </div>
                </li> 
        `;
      let position = "beforeend";
      navList.insertAdjacentHTML(position, madeList);
    }
    //taking input and adding data on main table and calling addExpense function.
    submit.addEventListener('click',(e)=>{
        e.preventDefault();
        if (text.value.trim().length > 0 && number.value.trim().length > 0) {
            let inputSelect = select.value;
            let inputText = text.value;
            let inputNumber = number.value;
            
            if(inputSelect=='Income'){
            income.innerHTML = parseFloat(income.innerHTML) + parseFloat(inputNumber);
            balance.innerHTML = parseFloat(balance.innerHTML) + parseFloat(inputNumber);
                list[0] += parseFloat(inputNumber);
                chart(list);

            }else{
                expense.innerHTML =
                  parseFloat(expense.innerHTML) + parseFloat(inputNumber);
                balance.innerHTML =
                  parseFloat(balance.innerHTML) - parseFloat(inputNumber);
                  list[1] += parseFloat(inputNumber);
                  chart(list);
            }

            // list.push({
            //   listInputSelect: inputSelect,
            //   listInputText: inputText,
            //   listInputNumber: inputNumber,
            // });
            // localStorage.setItem('list',JSON.stringify(list))
            addExpense(inputSelect,inputText,inputNumber);
            text.value = "";
            number.value = "";
            selectElement(".input").classList.remove("active");
        }
    })
    navList.addEventListener('click',(e)=>{
       if(e.target.classList.contains("del")){
           let li = e.target.parentElement.parentElement.parentElement;
           navList.removeChild(li);
        // console.log(li.children[0].children[1].children[0].textContent);
        let delMoney = li.children[0].children[1].children[0].textContent;
        // console.log(li.children[0].children[1].classList);
        if(li.children[0].children[1].classList.contains("Income")){
            income.innerHTML =
              parseFloat(income.innerHTML) - parseFloat(delMoney);
            balance.innerHTML =
              parseFloat(balance.innerHTML) - parseFloat(delMoney);
        }else{
            expense.innerHTML =
              parseFloat(expense.innerHTML) +  parseFloat(delMoney);
            balance.innerHTML =
              parseFloat(balance.innerHTML) - parseFloat(delMoney);
        }
        
           
       }
        
    })

    


}


// // Adding Time and Background
// time.innerHTML = `${days[day]},${months[month]} ${date}`;

