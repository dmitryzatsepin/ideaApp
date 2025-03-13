import { Alert } from '../Alert'
import { Segment } from '../Segment'
import { type FC } from 'react'

type ErrorPageComponentProps = {
  title?: string
  message?: string
  children?: React.ReactNode
}

export const ErrorPageComponent: FC<ErrorPageComponentProps> = ({
  title = 'Oops, error',
  message = 'Something went wrong',
  children,
}) => {
  return (
    <Segment title={title}>
      <Alert color="red">{message}</Alert>
      {children}
    </Segment>
  )
}
