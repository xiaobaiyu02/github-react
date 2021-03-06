var LeftRightContainer = React.createClass({
	changeImgLeft: function(){
		var imgArry = this.props.imgs;
		var selected = this.props.selected;
		function getTranslate(){
			for(var i=0; i<imgArry.length; i++){
				if(imgArry[i].name===selected){
					if(i-1>=0)
						return imgArry[i-1].name;
					else
						return imgArry[i].name;
				}
			}
		};
		this.props.onChangeImg(getTranslate());
	},
	changeImgRight: function(){
		var imgArry = this.props.imgs;
		var selected = this.props.selected;
		function getTranslate(){
			for(var i=0; i<imgArry.length; i++){
				if(imgArry[i].name===selected){
					if(i+1<imgArry.length)
						return imgArry[i+1].name;
					else
						return imgArry[i].name;
				}
			}
		};
		this.props.onChangeImg(getTranslate());
	},
	render: function(){
		return(
			<div className="hander">
				<span className="left" onClick={ this.changeImgLeft }></span>
				<span className="right" onClick={ this.changeImgRight }></span>
			</div>
		);
	}
});

var  QuickLookContainer= React.createClass({
	changeImg: function(e){
		console.log(e.target.attributes.name.value);
		var name = this.props.imgs.filter(function(item){ return item.name=== e.target.attributes.name.value})[0].name
		this.props.onQuicklook(name);
	},
	render: function(){
		var getName = this.props.selected;
		var quickLooks = this.props.imgs.map(function(data){
			return(
				<li key={data.name} name={ data.name } className={ data.name===getName ? "selected": ""} onClick={ this.changeImg }></li>
			);
		}, this);
		return(
			<ul className="quick-look">
				{ quickLooks }
			</ul>
		);
	}
});

var ImgContainer = React.createClass({
	render: function(){
		var imgArry = this.props.imgs;
		var selected = this.props.selected;
		function getTranslate(){
			for(var i=0; i<imgArry.length; i++){
				if(imgArry[i].name===selected){
					return 1/imgArry.length*i*100;
				}
			}
		};
		var translate = "translateX(-"+ getTranslate() +"%)";
		var imgs = this.props.imgs.map(function(data){
			var url = "./img/"+ data.name +".jpg";
			return(
				<li key={data.name}><h5>{ data.title }</h5><img src={ url } /><p className="desp">{ data.desp }</p></li>
			);
		});
		return(
			<div className="img-container">
				<ul style={{ transform: translate }}>
					{ imgs }
				</ul>
			</div>
		)
	}
});

var BannerScrollContainer = React.createClass({
	getInitialState: function() {
		return {selected: this.props.selected};
	},
	handleChange1: function(value){
		this.setState({ selected: value });
	},
	handleChange2: function(value){
		this.setState({ selected: value });
	},
	render: function(){
		return(
			<div className="banner-scroll">
				<QuickLookContainer imgs={ this.props.imgs } selected={ this.state.selected } onQuicklook={ this.handleChange2 } />
				<ImgContainer imgs={ this.props.imgs } selected={ this.state.selected }/>
				<LeftRightContainer onChangeImg={ this.handleChange1 } imgs={ this.props.imgs } selected={ this.state.selected }/>
			</div>
		)
	}
});


var IMGS = [
	{
		"name": "img1",
		"title": "This is a beautiful flower",
		"desp": "I love the way of rain drops falling on the leaves because that is the way you loved me."
	},
	{
		"name": "img2",
		"title": "This is a my little cat",
		"desp": "Look at the stars in the sky,that's all my wishes especiallly for you."
	},
	{
		"name": "img3",
		"title": "This is a my little duck",
		"desp": "When you turned back ,my heart twitched powerfully.Now I know it's the feeling of pain."
	}
];

ReactDOM.render(
	<BannerScrollContainer imgs={ IMGS } selected="img1"/>,
	document.getElementById("banner-scroll")
);