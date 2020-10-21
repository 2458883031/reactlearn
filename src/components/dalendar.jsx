import React from 'react'
import '../App.css'
class YearSelect extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            currentYear: new Date().getFullYear()
        }
        this.yearList=Array(20)
        this.setYearList(this.state.currentYear)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    setYearList(currentYear){
        for (let j=0;j<20;j++) {
            this.yearList[j] = currentYear - 10 + j
        }
        console.log(this.yearList)
    }
    handleSelectChange(event){
        this.setState({currentYear:event.target.value})
        this.setYearList(event.target.value)
    }
    render(){
        let optionItems = this.yearList.map((v,i)=>{
            return <OptionItem value={v} key={i}/>     
        })
        return <form className="yearBox">
            <select value={this.state.currentYear} onChange={this.handleSelectChange}>
                {optionItems}
            </select>
        </form>
    }
}
const OptionItem = function(props){
    return <option {...props}>{props.value}</option>
}
class MonthSelect extends React.Component{
    render(){
        let monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return React.createElement('div',
            {className:'monthBox'},
            monthName.map((v,i)=>{
                return <Tab text={v} key={i} className='month'/>
            })
        )
    }
}
class WeekTab extends React.Component{
    render(){
        let weekName = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
        return React.createElement('div',
            {className:'weekBox'},
            weekName.map((v,i)=>{
                return <Tab text={v} key={i} className='week'/>
            })
        )
    }
}
const Tab = function(props){
    return <span {...props}>{props.text}</span>
}
class DayItem extends React.Component{
    render(){
        return  <div className="dayItem">
            <Tab text={this.props.dateMD} className='dateMD'/>
            <Tab text={this.props.Weekday} className='Weekday'/>
            <Tab text={this.props.workSate} className='workSate'/>
            <ToDoList/>
        </div>
    }
}
class ToDoList extends React.Component{
    render(){
        return <ul>
            <li>ToDo1</li>
            <li>ToDo2</li>
        </ul>
    }
}
class DayBox extends React.Component{
    constructor(props){
        super(props)
        this.dayList = props.dayList
    }
    render(){
        let dayListEle = this.dayList.map((v,i)=>{
            return <DayItem dateMD={v} Weekday={((i % 7 === 0 ^ (i+1) % 7) === 0) ? "休息":"工作"} workSate="浑浑噩噩" key={i}/>
        })
        return <div className="dayBox">
            {dayListEle}
        </div>
        
    }
}
class Dalendar extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            year:(new Date()).getFullYear(),
            month:(new Date()).getMonth() + 1,
            week:(new Date()).getDay(),
            day:(new Date()).getDate(),
            dalendarData:Array(35)
        }
        
        this.getDays()
    }

    getDays(){
        let isLeapYear = (this.state.currentYear % 4 !== 0 && this.state.currentYear % 100 !== 0) ? true : false
        let solarMonth = [1,3,5,7,8,10,12];
        let lunarMonth = [4,6,9,11];
        let dateStr = `${(new Date()).getFullYear()}/${(new Date()).getMonth() + 1}/1`
        let firstIndex = (new Date(dateStr)).getDay()
        
        let getDayslist = (dayCount)=>{
            let dayIdx = 0,endIdx=0;
            for (let i = 0; i < this.state.dalendarData.length; i++) {
                this.state.dalendarData[i] = 0;
                if (i>=firstIndex && dayIdx<dayCount) {                    
                    dayIdx++
                    this.state.dalendarData[i] = dayIdx;
                }else if (dayIdx>=dayCount) {
                    endIdx++
                    this.state.dalendarData[i] = endIdx;
                }else{
                    if (solarMonth.indexOf(this.state.month-1)>=0) {
                        this.state.dalendarData[i] = 31 - (firstIndex - i - 1)
                    }else if (lunarMonth.indexOf(this.state.month-1)>=0) {
                        this.state.dalendarData[i] = 30 - (firstIndex - i - 1)
                    }else{
                        if (isLeapYear) {
                            this.state.dalendarData[i] = 29 - (firstIndex - i - 1)
                        }else{
                            this.state.dalendarData[i] = 28 - (firstIndex - i - 1)
                        }
                    }
                }
            }
        }

        if (solarMonth.indexOf(this.state.month)>=0) {
            getDayslist(31)
        }else if (lunarMonth.indexOf(this.state.month)>=0) {
            getDayslist(30)
        }else{
            if (isLeapYear) {
                getDayslist(29)
            }else{
                getDayslist(28)
            }
        }
    }

    render(){
        console.log(this)
        return <div className="row">
            <div className="col-md-1 d-flex flex-wrap">
                <YearSelect yyy="dddd"/>
                <MonthSelect/>
            </div>
            <div className="col-md-11 d-flex flex-wrap">
                <WeekTab/>
                <DayBox dayList={this.state.dalendarData}/>
            </div>
        </div>
    }
}
/* <DayItem dateMD="09-18" workSate="今天" Weekday="工作日"/> */
export default Dalendar