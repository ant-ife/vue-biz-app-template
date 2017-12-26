import assert from 'assert'

import * as _ from '~utils'

describe('test utils', () => {
  it('arrayFind work', () => {
    assert.equal(_.arrayFind([1, 2, 3], x => x > 2), 3)
    assert.equal(_.arrayFind([1, 2, 3], x => x > 3), null)
  })

  it('singletonPromise work', async () => {
    let sideEffects = 0

    const createPromise = async () => {
      const result = sideEffects++
      await _.sleep(100)
      return result
    }

    const single = _.singletonPromise(createPromise)

    const promiseA = single()
    const promiseB = single()

    await _.sleep(120)
    const promiseC = single()

    assert.equal(promiseA, promiseB)
    assert.notEqual(promiseA, promiseC)

    assert.equal(await promiseA, 0)
    assert.equal(await promiseC, 1)

    // createPromise executed twice
    assert.equal(sideEffects, 2)
  })
})
