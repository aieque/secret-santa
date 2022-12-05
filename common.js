const DevMode = false;

LoadPage = (Name) =>
{
	// Get the base path
	BasePath = window.location.href;
	BasePath = BasePath.substring(0, BasePath.lastIndexOf('/') + 1);

	window.location.href = BasePath + Name;
};

CreateMessageChain = (Speaker, Messages, OnCompletion=false, MessageIndex=0) =>
{
	if(MessageIndex == Messages.length || DevMode == true)
	{
		if(OnCompletion)
		{
			OnCompletion();
		}

		return;
	}

	Speaker.text(Messages[MessageIndex]);
	Speaker.fadeIn(2000, () =>
	{
		Speaker.fadeOut(2000, () =>
		{
			CreateMessageChain(Speaker, Messages, OnCompletion, MessageIndex + 1);
		});
	});
};

HashString = (String) =>
{
	let Hash = 5837;

	for(let Index = 0; Index < String.length; ++Index)
	{
		let Char = String.charCodeAt(Index);
		Hash = ((Hash << 5) - Hash) + Char;
	 	Hash |= 0;
	}

	return Hash;
};

HandleSubmit = () =>
{
	Input = $("#input").val()

	// Remove whitespace
	TrimmedInput = Input.replaceAll(" ", "");
	TrimmedInput = TrimmedInput.toLowerCase();

	Hash = HashString(TrimmedInput);
	PageToLoad = Hash + ".html"

	LoadPage(PageToLoad);

	return false; // Prevent reload
};