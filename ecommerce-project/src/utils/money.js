export function formatMoney (amountCents)
{
   const amount = amountCents>=0 ?
    `$${(amountCents / 100).toFixed(2)}` :
    `-$${(Math.abs(amountCents) / 100).toFixed(2)}`; 
   return amount;
}