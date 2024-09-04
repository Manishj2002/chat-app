const GenderCheckbox = ({onChangeBox,selected}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selected==='male'}`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900'
					checked={selected==='male'}
					onChange={()=>onChangeBox('male')}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selected==='female'}`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900'
					checked={selected==='female'}
					onChange={()=>onChangeBox('female')}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;