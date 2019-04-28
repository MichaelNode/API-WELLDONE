var fs = require('fs');

function delete_image(path_ori,file_name,path_responsive) {
	try {
		let path_join = path_ori + file_name
		if (fs.existsSync(path_join)) {
			fs.unlinkSync(path_join);
		} else {
			console.log('imagen_ori no encontrada')
		}
		if(path_responsive){
			const sizes = [ 
				{width: 640},
				{width: 768},
				{width: 900}
			]
			sizes.forEach((img)=> {
				let path_resp = path_responsive + img.width + 'px-' + file_name;
				if(fs.existsSync(path_resp)){
					fs.unlinkSync(path_resp);
				}else {
				    console.log('imagen_responsive no encontrada')
				}
			})										
		}		
	} catch(err) {
		console.error(err)
	}
}

module.exports = {
    delete_image
}