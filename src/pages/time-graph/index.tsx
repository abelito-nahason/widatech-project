import { Box } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StoreDispatch, StoreRootState } from "../../global/store"
import { getInvoiceGraph, resetGraphState } from "../../global/slices/invoiceGraphSlices"
import { VictoryChart, VictoryLine, VictoryScatter, VictoryZoomContainer } from "victory"
import currencyFormatter from "../../utils/currencyFormatter"
import styles from './index.module.css'


const NumberLabel = (props:any) => {
  const {x, y, datum} = props;
  return (
    <text x={x} y={y} fontSize={15}>
      { currencyFormatter(datum.y || 0) }
    </text>
  )
}

const calculateDateFromWeek = (yearWeekFormat:string) => {
  const year = parseInt(yearWeekFormat.substring(0,4))
  const week = parseInt(yearWeekFormat.split(yearWeekFormat.substring(0,4))[1])
  let date = (1 + (week - 1) * 7)
  let dateObj = new Date(year, 0, date)
  dateObj.setUTCHours(17 + 7,0,0,0)
  return dateObj.toISOString().split('T')[0]
} 

const TimeGraphPage = () => {
    const [mode, setMode] = useState('daily')
    const [mappedData, setMappedData] = useState<{x:string; y:number}[]>([])
    const selector = useSelector((state:StoreRootState)=> state.invoiceGraph)
    const dispatch = useDispatch<StoreDispatch>()
    const modes = ['Daily', 'Weekly', 'Monthly']

    const [width, setWidth] = useState(0);
    const graphRef = useCallback((node:any) => {
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width);
      }
    }, []);
  
    const updateWidth = (ev: any) => {
      setWidth(ev.target.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', updateWidth);
  
      return () => {
        window.removeEventListener('resize', updateWidth);
      };
    }, []);


    useEffect(()=> {
        dispatch(getInvoiceGraph({mode}))
    }, [mode])

    useEffect(()=> {
        if(selector.loading === 'succeeded') {
            dispatch(resetGraphState())
            
            if(mode === 'daily') {
              setMappedData(selector.data.result.map((val)=> ({x:val.unit.split('T')[0] , y:parseInt(val.revenue)})))
            } else if(mode === 'weekly'){
              setMappedData(selector.data.result.map((val)=> ({x:calculateDateFromWeek(val.unit) , y:parseInt(val.revenue)})))
            } else if(mode === 'monthly'){
              setMappedData(selector.data.result.map((val)=> ({x:`${val.unit.substring(0,4)}/${val.unit.split(val.unit.substring(0,4))[1]}` , y:parseInt(val.revenue)})))
            }
        }
    },[selector.loading])

    return (
        <>
            <h1>Invoice Time Graph</h1>
            <Box sx={{width:'100%'}} ref={graphRef}>
                <VictoryChart 
                width={width}
                domainPadding={{x:[15, 125], y:25}}
                height={500}
                padding={{ top:0, bottom: 50, left: 100, right: 50 }}
                containerComponent={<VictoryZoomContainer/>}
                >
                    <VictoryLine
                        data={mappedData}
                        interpolation='monotoneX'
                    />

                    <VictoryScatter
                        data={mappedData}
                        dataComponent={<NumberLabel/>}
                    />

                    <VictoryScatter
                        data={mappedData}
                    />
                </VictoryChart>
            </Box>
            <div className={styles.navigator}>
              {
                modes.map((mapMode, index)=> (
                  <React.Fragment key={mapMode}>
                    <span onClick={()=> setMode(mapMode.toLowerCase())} className={styles['navigator-pages']} aria-disabled={mapMode.toLowerCase() === mode}>{mapMode}</span>
                    { index !== modes.length - 1 ? <span>|</span> : undefined}                            
                  </React.Fragment>
                ))
              }
            </div>
        </>
    )

}

export default TimeGraphPage