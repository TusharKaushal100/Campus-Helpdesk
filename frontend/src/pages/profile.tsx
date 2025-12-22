import { QuestionCard } from "./question-card"
import {Plus} from "../icons/plus"
import {Question} from "../icons/question"

const txt = "hey there i am writing thsi meassge just to test kjcbewek coewn uooew uowee uoodbewe ioboew iowebo "
export const Profile = ()=>{
          return <QuestionCard icon = {<Question size={"md"}></Question>} image = {"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"} title={"this is sample"} description={txt}></QuestionCard>
}