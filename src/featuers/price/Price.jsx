export const Price = (props) => <>
  <p>{new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(props.price)}</p>
</>