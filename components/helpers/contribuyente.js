export function validarCuit(cuit) {
  if (typeof cuit == "undefined" || !cuit) return true;
 
  cuit = cuit.toString().replace(/[-_]/g, "");

  if (cuit.length != 11) return false;
  else {
    const mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let total = 0;

    for (let i = 0; i < mult.length; i++) {
      total += parseInt(cuit.charAt(i)) * mult[i];
    }
    var mod = total % 11;
    var digito = mod == 0 ? 0 : mod == 1 ? 9 : 11 - mod;
  }
  console.log(digito);
  return digito == parseInt(cuit.charAt(10));
}
