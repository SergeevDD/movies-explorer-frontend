
function FilterCheckbox() {

  return (
    <label className='filter' htmlFor='one'>
      <input className='filter__switch' type="checkbox" id='one' />
      <span className='filter__img'></span>
      <span className='filter__name'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
