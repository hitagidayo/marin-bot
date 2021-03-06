import {EWorkerStat, ISheetRow} from "../../../containers/Sheet.stats/Sheet.stats.types";
import {Grid} from "@mantine/core";
import {StatsSegments} from "../../common/Stats.segments/Stats.segments";
import {ArrowBigRightLines, Bandage, BoxMultiple1, Download, SquaresFilled, Stars, Upload} from "tabler-icons-react";

interface Props {
    cards: ISheetRow[]
}

function WorkerStats({cards}: Props) {

    let colorWheel = ["blue", "indigo", "violet", "grape", "pink", "red"]
    let iconMap:any = {
        workerDropper: Download,
        workerGrabber: Upload,
        workerPurity: Stars,
        workerQuickness: ArrowBigRightLines,
        workerStyle: SquaresFilled,
        workerToughness: Bandage,
        workerVanity: BoxMultiple1
    }

    function getWorkerStatistics() {
        let workerStats: any = {}
        let workerStatFields = [
            "workerDropper",
            "workerGrabber",
            "workerPurity",
            "workerQuickness",
            "workerStyle",
            "workerToughness",
            "workerVanity",
        ]
        workerStatFields.forEach(field => workerStats[field] = initializeField())
        cards.forEach(card => {
            workerStatFields.forEach(field => {
                workerStats[field][(card as any)[field]] += 1;
                workerStats[field]["total"] += 1;
            })
        })
        return workerStats;
    }

    function initializeField() {
        let obj: any = {};
        Object.keys(EWorkerStat).forEach(key => obj[key] = 0);
        obj["total"] = 0;
        return obj;
    }

    function renderWorkerGrid() {
        let stats = getWorkerStatistics();
        return Object.keys(stats).map((stat) => {
            let data:any = [];
            Object.keys(stats[stat]).map((workerStat, index) => {
                if (workerStat !== "total") {
                    data.push({
                        label: workerStat,
                        count: stats[stat][workerStat],
                        part: Math.round((stats[stat][workerStat] / stats[stat]["total"]) * 10000) / 100,
                        color: colorWheel[index],
                    })
                }
            })
            return (
                <Grid.Col key={stat} md={6} xl={3}>
                    <StatsSegments total={stat.slice(6, stat.length)} data={data} icon={iconMap[stat]}/>
                </Grid.Col>
            )
        })
    }

    return (
        <Grid>
            {renderWorkerGrid()}
        </Grid>
    )

}

export default WorkerStats;