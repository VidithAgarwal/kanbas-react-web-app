
import EnvironmentVariables from "./EnvironmentVariables"
import PathParameters from "./PathParameteres"
import QueryParameters from "./QueryParameters"
import WorkingWithObjects from "./WorkingWithObjects"
import WorkingWithModules from "./WorkingWithModules"
import WorkingWithArrays from "./WorkingWithArrays"
import HttpClient from "./HttpClient"
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously"
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously"
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function Lab5() {
    return (
      <div className="container" id="wd-lab5">
        <a id="wd-landing-page" className="list-group-item text-white bg-black text-center border-0" href="/">Back to landing page</a>
          
        <h2>Lab 5</h2>
        <div className="list-group">
          <a href={`${REMOTE_SERVER}/lab5/welcome`}          
             className="list-group-item">
             Welcome
          </a>
        </div><hr/>
        <EnvironmentVariables />
        <PathParameters/>
        <QueryParameters/>
        <WorkingWithObjects/>
        <WorkingWithModules/>
        <WorkingWithArrays/>
        <HttpClient/>
        <WorkingWithObjectsAsynchronously/>
        <WorkingWithArraysAsynchronously/>
        <hr/>
      </div>
    );
  }
  