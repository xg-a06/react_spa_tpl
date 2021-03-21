// /* eslint-disable prefer-const */
// /* eslint-disable no-unused-vars */
// import { v1 } from 'uuid';
// import seriesService from '../../../services/series';
// import { VIEWER_PLANE } from '../../../../tx_const';

// const model = {
//   key: 'series',
//   state: {
//     entities: {},
//   },
//   reducers: {
//     addSeries(state, payload) {
//       state.entities[payload.seriesInstanceUID] = { ...state.entities[payload.seriesInstanceUID], ...payload };
//     },
//     addSerieses(state, payload) {
//       Object.entries(payload).forEach(([k, v]) => {
//         state.entities[k] = v;
//       });
//     },
//   },
//   effects: {
//     async getSeries({ studyInstanceUID, seriesInstanceUID, areaId }) {
//       const states = this.$root.getState();

//       const seriesInfo = states.series.entities[seriesInstanceUID];
//       if (!seriesInfo || !seriesInfo.modality) {
//         const res = await seriesService.getSeries(seriesInstanceUID);
//         if (res.data) {
//           const series = res.data;
//           const { images } = series;
//           delete series.images;

//           this.addSeries(series);
//           this.$root.actions.image.addImages({
//             seriesId: seriesInstanceUID,
//             images,
//           });
//         }

//         // setTimeout(() => {
//         //   this.$root.effects.task.getTasks(seriesInstanceUID);
//         // }, 100);
//       }

//       let { activeAreaId, areaViewports } = states.layout;
//       if (areaId) {
//         activeAreaId = areaId;
//       }

//       if (areaViewports[activeAreaId]) {
//         const { [areaViewports[activeAreaId]]: viewport } = states.viewport;
//         this.$root.actions.viewport.updateViewport({
//           id: viewport.id,
//           studyInstanceUID,
//           seriesInstanceUID,
//         });
//       } else {
//         const viewport = {
//           id: v1(),
//           currentIndex: 0,
//           studyInstanceUID,
//           seriesInstanceUID,
//           plane: VIEWER_PLANE.AXIAL,
//         };
//         this.$root.actions.viewport.addViewport(viewport);

//         this.$root.actions.layout.updateAreaViewports({
//           areaId: activeAreaId,
//           viewportId: viewport.id,
//         });
//       }

//       this.$root.effects.predict.getPredictData({
//         seriesInstanceUID,
//         resultType: this.$root.getState().app.resultType,
//       });
//     },
//   },
// };

// export default model;
