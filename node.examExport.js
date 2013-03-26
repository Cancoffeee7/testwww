

exports.count = function(){
  var count = 0;
	return function(){
		return ( count += 1 );
	}
}
