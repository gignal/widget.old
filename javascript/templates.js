(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['checkin'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"grid_3 gig-outerbox\">\n	<div class=\"gig-widbox\">\n		<h3 class=\"gig-widtitle\">\n			<img src=\"";
  stack1 = depth0.user_image;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" alt=\"\" class=\"img_floatLeft gig-avatar\">\n			";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</h3>\n		<p class=\"gig-checkedin\">just checked in</p>\n	</div>\n</div>	\n";
  return buffer;});
templates['image'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"gig-widbox gig-widimgbox\" style=\"background-image:url('";
  stack1 = depth0.thumb_photo;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "');\">\n	<!-- <a href=\"";
  stack1 = depth0.large_photo;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"modal\"><img src=\"";
  stack1 = depth0.thumb_photo;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" alt=\"\"></a> -->\n	<div class=\"gig-imgauthor\">\n		<h3 class=\"gig-widtitle\">\n			<img src=\"images/";
  stack1 = depth0.service;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ".png\" alt=\"";
  stack1 = depth0.service;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"img_floatLeft gig-avatar\">\n			<a href=\"";
  stack1 = depth0.user_id;
  stack2 = depth0.username;
  stack3 = depth0.service;
  foundHelper = helpers.profilelink;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, stack2, stack1, {hash:{}}) : helperMissing.call(depth0, "profilelink", stack3, stack2, stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" target=\"_top\"><img src=\"";
  stack1 = depth0.user_image;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" alt=\"avatar\" class=\"img_floatLeft gig-avatar\"></a>\n			";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</h3>\n	</div>\n</div>\n";
  return buffer;});
templates['text'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"gig-widbox\">\n	<p class=\"text\">";
  stack1 = depth0.text;
  foundHelper = helpers.linkify;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "linkify", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n	<!-- <p class=\"read-more\">…</p> -->\n	<h3 class=\"gig-widtitle\">\n		<img src=\"images/";
  stack1 = depth0.service;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ".png\" alt=\"";
  stack1 = depth0.service;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"img_floatLeft gig-avatar\">\n		<a href=\"";
  stack1 = depth0.user_id;
  stack2 = depth0.username;
  stack3 = depth0.service;
  foundHelper = helpers.profilelink;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, stack2, stack1, {hash:{}}) : helperMissing.call(depth0, "profilelink", stack3, stack2, stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" target=\"_top\"><img src=\"";
  stack1 = depth0.user_image;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" alt=\"avatar\" class=\"img_floatLeft gig-avatar\"></a>\n		";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n	</h3>\n	<div class=\"gig-actionbtns\">\n		<a href=\"https://twitter.com/intent/tweet?screen_name=";
  stack1 = depth0.username;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-related=\"";
  stack1 = depth0.username;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ",gignal\">@reply</a>\n	</div>\n</div>\n";
  return buffer;});
})();