import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import routeruploadfs from "./routes/uploadfs.js"
import routerusers from "./routes/captura.js"
import routertrackfs from "./routes/uptrackingfs.js"
import routertrackdetfs from "./routes/uptrackingdetailfs.js"
import routeruploadsalud from "./routes/wstransalud.js"
import routertracksalud from "./routes/uptrackingsalud.js"
import routertrackdetsalud from "./routes/uptrackingdetailsalud.js"
import routeruploadsegcity from "./routes/wstransegciuda.js"
import routertracksegcity from "./routes/uptrackingsegciuda.js"
import routertrackdetsegcity from "./routes/uptrackingdetailsegciuda.js"

import routertrackdeteduca from "./routes/uptrackingdetaileduca.js"
import routeruploadeduca from "./routes/wstraneducacion.js"
import routertrackeduca from "./routes/uptrackingeduca.js"
import routertrackdetvisita from "./routes/uptrackingdetailvisitas.js"
import routeruploadvisita from "./routes/wstranvisitas.js"
import routertrackvisita from "./routes/uptrackingvisitas.js"

import routertranstpi from "./routes/wstrantpi.js"
import routertracktpi from "./routes/uptrackingtpi.js"
import routertrackdettpi from "./routes/uptrackingdetailtpi.js"
import routertransdiu from "./routes/wstrandiu.js"
import routertrackdiu from "./routes/uptrackingdiu.js"
import routertrackdetdiu from "./routes/uptrackingdetaildiu.js"
import routersyncsegusuperv from "./routes/wstransegciuda-supervpres.js"
import routersyncsegugabi from "./routes/wstransegciuda-gabinete.js"
import routersyncseguevaluac from "./routes/wstransegciuda-evalua.js"
import routersyncvisitdomencu from "./routes/wstranvisitasdom.js"
import routersyncvisitdomsuper from "./routes/wstranvisitasdom-superv.js"
import routersyncanemiree from "./routes/wstransanemia-ree.js"
import routersyncdiurno from "./routes/wstransdiurno.js"
import routersynctrackdiurno from "./routes/uptrackingdiurno.js"
import routersynctrackdetdiurno from "./routes/uptrackingdetaildiurno.js"

import routersyncsalusupvanemia from "./routes/wstransalud-supv-anemia-dan.js"
import routersyncsalusupvmental from "./routes/wstransalud-supv-mental-dan.js"
import routersyncsalusupvsatisfac from "./routes/wstransalud-supv-satisfac-dan.js"

dotenv.config()
const app = express()

//Middleware
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Max-Age', '1000');
    //res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    //res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.disable('etag');


app.use('/api',routeruploadfs)
app.use('/api', routerusers);
app.use('/api', routertrackfs);
app.use('/api', routertrackdetfs);
app.use('/api',routeruploadsalud)
app.use('/api', routertracksalud);
app.use('/api', routertrackdetsalud);
app.use('/api',routeruploadsegcity)
app.use('/api', routertracksegcity);
app.use('/api', routertrackdetsegcity);
app.use('/api',routertrackdeteduca)
app.use('/api', routeruploadeduca);
app.use('/api', routertrackeduca);
app.use('/api',routertrackdetvisita)
app.use('/api', routeruploadvisita);
app.use('/api', routertrackvisita);
app.use('/api',routertranstpi)
app.use('/api', routertracktpi);
app.use('/api', routertrackdettpi);
app.use('/api',routertransdiu)
app.use('/api', routertrackdiu);
app.use('/api', routertrackdetdiu);
app.use('/api',routersyncsegusuperv)
app.use('/api', routersyncsegugabi);
app.use('/api', routersyncseguevaluac);
app.use('/api', routersyncvisitdomencu);
app.use('/api', routersyncvisitdomsuper);
app.use('/api', routersyncanemiree);
app.use('/api', routersyncdiurno);
app.use('/api', routersynctrackdiurno);
app.use('/api', routersynctrackdetdiurno);
app.use('/api', routersyncsalusupvanemia);
app.use('/api', routersyncsalusupvmental);
app.use('/api', routersyncsalusupvsatisfac);


app.listen(process.env.PORT, ()=>{
    console.log('Servidor en puerto : ' , process.env.PORT);
})


