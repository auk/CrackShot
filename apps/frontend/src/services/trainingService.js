/**
 * Get training time
 * @param {*} training - training object
 */
export const getTrainingTime = (training) => {
  if (training) {
    return training.date + (training.time ? ' ' + training.time : '');
  }
  return ''
}