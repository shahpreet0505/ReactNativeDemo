import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice';
import { bayWiseLoadingChartReducer, avgBayWiseFlowRateChartReducer, productWiseLoadedChartReducer, higherCycleTimeChartReducer } from './reducers/dashboardSlice'
import { ttsManuallyCompleteddataReducer, ttsManuallyCompletedTableGrid1DataReducer, ttsManuallyCompletedTableGrid2DataReducer } from './reducers/TTManuallyCompletedSlice'
import { ttsLateReportingdataReducer, ttsLateReportingTableGrid1DataReducer, ttsLateReportingTableGrid2DataReducer } from './reducers/TTLateReportingSlice'
import { tankUtilizationCardDataReducer, tankUtilizationForBarChartDataReducer, tankUtilizationTableGridDataReducer} from './reducers/TankUtilizationSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        fetchBayWiseLoadingChart: bayWiseLoadingChartReducer,
        fetchAvgBayWiseFlowRateChart: avgBayWiseFlowRateChartReducer,
        fetchProductWiseLoadedQtyChart: productWiseLoadedChartReducer,
        fetchHigherCycleTimeChart: higherCycleTimeChartReducer,
        fetchTTSManuallyCompletedData: ttsManuallyCompleteddataReducer,
        fetchTTSManuallyCompletedTableGrid: ttsManuallyCompletedTableGrid1DataReducer,
        fetchTTSManuallyCompletedTableGrid2: ttsManuallyCompletedTableGrid2DataReducer,
        fetchTTSLateReportingData: ttsLateReportingdataReducer,
        fetchTTSLateReportingTableGrid1: ttsLateReportingTableGrid1DataReducer,
        fetchTTSLateReportingTableGrid2: ttsLateReportingTableGrid2DataReducer,
        fetchTankUtilizationCardData: tankUtilizationCardDataReducer,
        fetchTankUtilizationBarChartData: tankUtilizationForBarChartDataReducer,
        fetchTankUtilizationTableGridData: tankUtilizationTableGridDataReducer,

    },
})

export default store;