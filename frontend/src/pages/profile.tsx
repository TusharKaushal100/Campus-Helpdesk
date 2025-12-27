import { QuestionCard } from "./question-card"
import {Plus} from "../icons/plus"
import {Question} from "../icons/question"
import { AnswerCard } from "./answer-card"
import { HostBox } from "./host-box"
import { SideBar } from "./sidebar"

const txt = "hey there i am writing thsi meassge just to test kjcbewek coewn uooew uowee uoodbewe ioboew iowebo "
const url = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61" 

export const Profile = ()=>{
          return <div className="flex gap-2">
            <div>
                <SideBar></SideBar>
            </div>
            <div className = "flex-1 gap-2" >  {/*take the remaining width with flex-1 need to have flex setup in the parent div */}
                <HostBox
                question = {<QuestionCard icon = {<Question size={"md"}></Question>} image = {url} title={"this is sample"} description={txt}></QuestionCard>}
                answer = { [<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>,<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>,<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>,<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>]}
                
            ></HostBox>
            <HostBox
                question = {<QuestionCard icon = {<Question size={"md"}></Question>} image = {url} title={"this is sample"} description={txt}></QuestionCard>}
                answer = { [<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>,<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>,<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>,<AnswerCard name = {"Kartik"} content={txt} image= {url}></AnswerCard>]}
                
            ></HostBox>
            </div>
            

                {/* <QuestionCard icon = {<Question size={"md"}></Question>} image = {"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"} title={"this is sample"} description={txt}></QuestionCard>
                <AnswerCard name = {"Kartik"} content={txt} image= {"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"}></AnswerCard> */}

          </div>
}