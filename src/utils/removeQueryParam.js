
function removeQueryParam(paramKeyToRemove,router) {
	const { pathname, query } = router;
  
	// Remove the query parameter
	delete query[paramKeyToRemove];
  
	// Generate the new URL without the specified query parameter
	const updatedUrl = {
	  pathname,
	  query: { ...query }
	};
  
	// Navigate to the updated URL
	router.push(updatedUrl, undefined, { shallow: true });
  }

export default removeQueryParam
