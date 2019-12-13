const Promise = require('bluebird'),
	gm =  require('gm'),
	path = require('path'),
	_ = require('lodash'),
	uploadDir = path.resolve("./uploads"),
	RESIZED_IMAGE_DIMENSION = "200";

var seq = new Date().getTime();
Promise.promisifyAll(gm.prototype);

//========================================= Exports =================================================================

module.exports = { resizeImage, RESIZED_IMAGE_DIMENSION }

//========================================= Implementation =========================================================

/**
 *
 * @param imagePath
 * @param sizeArray : array of Diff Sizes
 * @private
 */
function resizeImage(imagePath, sizeArray , extension) {

	var promiseArray = [] , image = {} ;

	_.each( sizeArray , function (size) {
		promiseArray.push( __resize( imagePath , size , extension ))
	})

	return Promise.all( promiseArray )
		.then( function (resizedImages) {
			//Create Object With Size as Keys
			_.each( resizedImages , function (resizedImage , index ) {
				image[ sizeArray[ index]] = resizedImage;
			})
			//Add Default Image
			image.default = imagePath;
			return image;
		})
	}


//======================================= Helper Functions ============================================================

/**
 *
 * @param filePath
 * @param size
 * @param ext : File Extension
 * @private
 */
function __resize(filePath , size , ext ) {
	//destination
	var dest = path.resolve( uploadDir , String(seq++) + ext );

		return gm( filePath )
			.resize( size , size )
			.autoOrient()
			.writeAsync(dest)
			.then( () => dest )
			.catch( err => { throw err })

}
