/**
 * Function for handle inputs change
 * @param event
 * @return {{}}
 */
export function handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  return {
    [name]: value
  };
}