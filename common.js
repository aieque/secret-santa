const DevMode = true;

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

SetCookie = (Name, Value, Days) =>
{
	const MyDate = new Date();
	MyDate.setTime(MyDate.getTime() + (Days*24*60*60*1000));
	let Expires = "expires="+MyDate.toUTCString();
	document.cookie = Name + "=" + Value + ";" + Expires + ";path=/";
};

GetCookie = (Name) =>
{
	Name = Name + "=";
	let DecodedCookie = decodeURIComponent(document.cookie);
	let Entries = DecodedCookie.split(";");

	for(let Index = 0;
		Index < Entries.length;
		++Index)
	{
		let Entry = Entries[Index];
		while(Entry.charAt(0) == ' ')
		{
			Entry = Entry.substring(1);
		}
		
		if(Entry.indexOf(Name) == 0)
		{
			return Entry.substring(Name.length, Entry.length);
		}
	}

	return "";
};

SaveProgress = (Progress) =>
{
	let CurrentProgress = GetCookie("CurrentProgress");
	if(CurrentProgress == "")
	{
		CurrentProgress = 0;
	}
	
	CurrentLevel = window.location.href;
	CurrentLevel = CurrentLevel.substring(CurrentLevel.lastIndexOf('/') + 1);

	if(Progress >= CurrentProgress)
	{
		SetCookie("CurrentLevel", CurrentLevel, 10000000);
		SetCookie("CurrentProgress", Progress, 10000000);
	}
};