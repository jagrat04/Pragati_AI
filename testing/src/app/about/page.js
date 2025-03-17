// import Navbar from './components/Navbar';
import WeeklyProgress from './components/WeeklyProgress';
import PredictiveAnalysis from './components/PredictiveAnalysis';
import WeatherForecast from './components/WeatherForecast';

export default function about() {
  return (
    <div className="about">
      {/* <Navbar /> */}
      <div className="content">
        <div>
            
        <WeeklyProgress />
        <PredictiveAnalysis />
        </div>
        <WeatherForecast />
      </div>
    </div>
  );
}
