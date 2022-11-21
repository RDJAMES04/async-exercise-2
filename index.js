function asyncParallel1(par1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Number(par1) / 2 > 10000) {
        reject(new Error('Parallel #1 time out!'))
      } else {
        resolve(true)
      }
    }, par1 / 2)
  })
}
function asyncParallel2(par1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Number(par1) / 3 > 10000) {
        reject(new Error('Parallel #2 time out!'))
      } else {
        resolve(true)
      }
    }, par1 / 3)
  })
}
function asyncParallel3(par1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Number(par1) / 4 > 10000) {
        reject(new Error('Parallel #3 time out!'))
      } else {
        resolve(true)
      }
    }, par1 / 4)
  })
}
async function runAsyncParallels(par1) {
  Promise.allSettled([asyncParallel1(par1), asyncParallel2(par1), asyncParallel3(par1)])
    .then((responses) => responses.forEach((response) => {
      if (response.status !== 'fulfilled') {
        console.log(response.reason.message)
      } else {
        console.log(response.value.toString())
      }
    }))
}
async function asyncPromise(par1) {
  return new Promise((resolve, reject) => {
    if (Number(par1) < 0 || Number(par1) > 50000) {
      reject(new Error('Par1 invalid'))
    }
    setTimeout(() => {
      if (par1 > 25000) {
        reject(new Error('Server Timeout'))
      } else {
        resolve(par1 * 2)
      }
    }, 1000 + par1)
  })
}
function asyncCB(par1, cb) {
  asyncPromise(par1)
    .then((response) => {
      cb(null, response)
      asyncCB(response, cb)
    })
    .catch((err) => cb(err))

  runAsyncParallels(par1)
}
function myCallback(err, result) {
  if (err) {
    console.log(`ERR: ${err.message}`)
  } else {
    console.log(`SUCCESS: ${result}`)
  }
}

asyncCB(30, myCallback)
