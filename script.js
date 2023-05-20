async function init() {

    let query;

    async function getCountry() {
        const con = await fetch('https://airlabs.co/api/v9/countries?&api_key=52f6220d-3181-42aa-a74b-d2446ca00c89')
        const con_data = await con.json();
        const country_data = con_data.response;
        // console.log(country_data);
        country_data.forEach((val) => {
            // console.log(val.name);
            // console.log(val.code);

            const msg = `<option value="${val.code}" >${val.name}</option>`;
            DOM_strings.countryList.insertAdjacentHTML('beforeend', msg);
        })

        
        DOM_strings.countryList.addEventListener('change', async () => {
            // console.log("change click");
            // console.log(DOM_strings.countryList.value);
            query = DOM_strings.countryList.value;
            DOM_strings.cityLists.innerHTML='<option >Selcect City</option>';
            await getData(query);
            
            
        })
    }

    await getCountry();

    async function getData() {
        try {


            const city = await fetch(`https://airlabs.co/api/v9/cities?country_code=${query}&api_key=52f6220d-3181-42aa-a74b-d2446ca00c89`)

            const data = await city.json();
            const city_data = data.response;
            // console.log(newdata);

            city_data.forEach((el) => {
                // console.log(el);
                const msg = `<option >${el.name}</option>`
                // console.log(msg);
                DOM_strings.cityLists.insertAdjacentHTML('beforeend', msg);
            })


        } catch (err) {
            alert(err);
        }


    }

    // Clear the Country
    function clearCountry(){
        DOM_strings.countryList.innerHTML='<option value="IN">Selcect Country</option>'
        getCountry();
    }

    DOM_strings.cityLists.addEventListener('change', () => {
        // console.log("change click");
        // console.log(typeof(DOM_strings.cityLists.value));
        const arr = (DOM_strings.cityLists.value).split(" ");
        const city = arr[0];
        // console.log(city);
        spinner(DOM_strings.load)
        getWeather(city);
        clearCountry(); 
    })

    function dayTime()
    {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date();

        let day = weekday[d.getDay()];    
        let name = month[d.getMonth()];
        let dat = d.getDate();

        return [day,name,dat];
    }


    async function getWeather(city_name)
    {
        
        const api_key = '433c20d450195c281209df98ce8db61a';
        // const city_name= 'Mumbai'
        
       const data= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`);
       const we_data = await data.json();
    //    console.log(we_data)
       const temp = parseFloat((we_data.main.temp - 273.15).toFixed(2));
    //    console.log(temp);
       const func = dayTime();
       
    //    console.log(func[0],func[1],func[2]);
    //    console.log(we_data.weather[0].main);

       const msg = `<p class="temp">${temp}<span>&#176;</span>C</p><p class="desc">${we_data.weather[0].main}</p><p="days">${func[0]}, ${func[1]} ${func[2]}</p>`;

       const icon = we_data.weather[0].icon;
    //    console.log(msg);
       const imageUrl = `<img id="img1" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Not Available">`;
       DOM_strings.info.innerHTML='';
       DOM_strings.img.innerHTML='';
       clearSpinner();
        // console.log(icon);
        DOM_strings.img.insertAdjacentHTML('afterbegin',imageUrl);
       DOM_strings.info.insertAdjacentHTML('afterbegin',msg);

       DOM_strings.sec_2.classList.remove("extra");

    }

    
}

init();