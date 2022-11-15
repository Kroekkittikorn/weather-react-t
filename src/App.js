import './App.css';
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, appBarClasses } from '@mui/material';
import { bgcolor, fontSize, padding } from '@mui/system';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { FourK } from '@material-ui/icons';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '16px'
}));

const imgMyimageexample = "https://img.freepik.com/free-vector/minimalist-white-abstract-background_23-2148816315.jpg?w=2000&t=st=1668506347~exp=1668506947~hmac=1e50e1bf69cffc642458f9c2647967fef00e84cbeb22abffee3c2c7580dc2879";
const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover'   
};

function App() {
  const cityname = "Bangkok";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null)
  const [forecast, setForcast] = useState(null);
  var today = new Date();
  var dayth = String(today.getDate()).padStart(2, '0');
  var mon = String(today.getMonth()+1);
  const handleOnclick = async () => {
    document.getElementById('ctn').innerHTML = document.getElementById('citynameTextF').value;
    var weatherLocation = document.getElementById('citynameTextF').value;
    const data = await (await fetch('http://api.openweathermap.org/data/2.5/weather?q='+weatherLocation+'&appid=fc954186a6fb9cca05088ae246960f0e&units=metric')).json()
    setData(data)
    console.log(data["dt"]);
    const forecast = await (await fetch('https://api.open-meteo.com/v1/forecast?latitude='+data["coord"]["lat"]+'&longitude='+data["coord"]["lon"]+'&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FBangkok')).json()
    setForcast(forecast)
    console.log(forecast["daily"]);
    document.getElementById('temp').innerHTML = Math.round(data["main"]["temp"])+" °C";
    document.getElementById('weatherDetail').innerHTML = data["weather"][0]["main"];
    document.getElementById('conditionImg').src = "https://openweathermap.org/img/wn/"+data["weather"][0]["icon"]+"@2x.png"
    const milliseconds = data["dt"] * 1000 
    const dateObject = new Date(milliseconds)
    var daythNum = Number(dayth)
    var i = 0;
    while(i<=6){
      document.getElementById('date'+i).innerHTML = (daythNum+i)+"/"+mon;
      if(forecast["daily"]["weathercode"][i] === 0){
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/01d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "Clear";
      }else if(forecast["daily"]["weathercode"][i] === 1 || forecast["daily"]["weathercode"][i] === 2 || forecast["daily"]["weathercode"][i] === 3){
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/03d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "Clouds";
      }else if(forecast["daily"]["weathercode"][i] === 80 || forecast["daily"]["weathercode"][i] === 81 || forecast["daily"]["weathercode"][i] === 82 || forecast["daily"]["weathercode"][i] === 61 || forecast["daily"]["weathercode"][i] === 63
      || forecast["daily"]["weathercode"][i] === 65 || forecast["daily"]["weathercode"][i] === 66 || forecast["daily"]["weathercode"][i] === 67){
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/09d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "Rain";
      }else if(forecast["daily"]["weathercode"][i] === 95 || forecast["daily"]["weathercode"][i] === 96 || forecast["daily"]["weathercode"][i] === 99){
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/11d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "Thunderstorm";
      }else if(forecast["daily"]["weathercode"][i] === 45 || forecast["daily"]["weathercode"][i] === 48 || forecast["daily"]["weathercode"][i] === 56 || forecast["daily"]["weathercode"][i] === 57){
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/50d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "Fog";
      }else if(forecast["daily"]["weathercode"][i] === 71 || forecast["daily"]["weathercode"][i] === 73 || forecast["daily"]["weathercode"][i] === 75 || forecast["daily"]["weathercode"][i] === 77 || forecast["daily"]["weathercode"][i] === 85
      || forecast["daily"]["weathercode"][i] === 86 ){
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/13d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "Snow";
      }else{
        document.getElementById('fcconditionImg'+i).src = "https://openweathermap.org/img/wn/01d@2x.png"
        document.getElementById('fcweather'+i).innerHTML = "NA";
      }
      document.getElementById('MaxTemp'+i).innerHTML = "▲ "+forecast["daily"]["temperature_2m_max"][i];
      document.getElementById('MinTemp'+i).innerHTML = "▼ "+forecast["daily"]["temperature_2m_min"][i];
      i++;
    }
  }
  return (
  <div className="App" style={divStyle}>
       <Box display="flex" justifyContent="center" backgroundColor="#ffffff" alignItems="center" height="60px" sx={{ boxShadow: 1 }}>
          <br></br>
          <Box display="flex" justifyContent="center" alignItems="center" maxWidth="100">
          </Box>
          <TextField
            id="citynameTextF"
            variant="outlined"
            size="small" 
            defaultValue="Bangkok"/>
          &nbsp;&nbsp;
          <Button id="search" style={{
            borderRadius: 10,
            backgroundColor: "#fffff",
            fontSize: "10px"
          }} variant="outlined" type="submit"  onClick={handleOnclick} startIcon={<SearchIcon />}>Search</Button>
        </Box>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <Container id="contentweather">
          <Stack direction="row" spacing={1}>
            <Item>
              <Container sx={{ width: 260 }} >
                <Typography variant="h5" id='ctn' color="text.primary" gutterBottom>
                  
                </Typography>
                <Typography variant="h5" component="div">
                  <img id="conditionImg" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="100px"
                    width="100px" />
                </Typography>
                <Typography id='temp' variant="h5" component="div">
                  
                </Typography>
                <Typography id="weatherDetail" sx={{ mb: 1.5 }} color="text.secondary">
                <CircularProgress/> 
                </Typography>
                <Typography id="DateTime" hidden={true} variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
                </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date0' /> <br></br>
                <Typography id='weathericon0'>
                  <img id="fcconditionImg0" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather0' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp0' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp0' > <CircularProgress/> </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date1' /> <br></br>
                <Typography id='weathericon1'>
                  <img id="fcconditionImg1" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather1' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp1' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp1' > <CircularProgress/> </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date2' /> <br></br>
                <Typography id='weathericon2'>
                  <img id="fcconditionImg2" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather2' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp2' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp2' > <CircularProgress/> </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date3' /> <br></br>
                <Typography id='weathericon3'>
                  <img id="fcconditionImg3" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather3' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp3' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp3' > <CircularProgress/> </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date4' /> <br></br>
                <Typography id='weathericon4'>
                  <img id="fcconditionImg4" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather4' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp4' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp4' > <CircularProgress/> </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date5' /> <br></br>
                <Typography id='weathericon5'>
                  <img id="fcconditionImg5" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather5' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp5' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp5' > <CircularProgress/> </Typography>
              </Container>
            </Item>
            <Item>
              <Container>
                <Typography id='date6' /> <br></br>
                <Typography id='weathericon6'>
                  <img id="fcconditionImg6" src='https://cdn-icons-png.flaticon.com/512/1163/1163662.png'
                    height="60px"
                    width="60px" />
                </Typography><br></br>
                <Typography sx={{ fontSize: 12 }} id='fcweather6' /><br></br>
                <Typography sx={{ fontSize: 15 }} id='MaxTemp6' />
                <Typography sx={{ fontSize: 15 }} id='MinTemp6' > <CircularProgress/> </Typography>
              </Container>
            </Item>

          </Stack>
        </Container>
      </div>
  );
  
}

export default App;
