import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { errorSelector } from '@/app/selectors.ts'
import { setAppErrorAC } from '@/reducers/app-reducer.ts'


export function ErrorSnackbar() {

  const error = useAppSelector<string|null>(errorSelector)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setAppErrorAC({ error: null }))
  }

  return (
    <>
      {error && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <div>
              <span>{error}</span>
              <button onClick={handleClose} className="btn btn-sm btn-ghost ml-2">✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
