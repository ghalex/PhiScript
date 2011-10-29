/**
 *
 * script: View.js
 * name: Phi.UI.View
 * 
 * description: 
 * This class is used to create views.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
Phi.UI.View = new Class({
	Extends: Phi.UI.Container,
	
	model: null,
	
	initialize: function(options)
	{
		this.parent(options);
	},
	
	setModel: function( value )
	{
		this.model = value;
		this.model.addEvent('change', this.onModelChange.bind(this));
		
		this.onModelChange();
	},
	
	getModel: function()
	{
		return this.model;
	},
	
	prepareChildren: function( target )
	{
		if( instanceOf(target, Phi.UI.Container))
		{
			var iterator = target.createIterator();
		
			while( iterator.moveNext() )
			{
				var child = iterator.current();
				this.prepareChildren( child );
			}
		}
		
		if( target.options.id )
			this[ target.options.id ] = target;
	},
	
	updateBinds: function( view )
	{
	},
	
	updateBindsForChild: function( target, view )
	{
		if( instanceOf(target, Phi.UI.Container))
		{
			var iterator = target.createIterator();
		
			while( iterator.moveNext() )
			{
				var child = iterator.current();
				
				//if( !instanceOf(child, Phi.UI.View) )
				if( child.getParentView() == view )
					this.updateBindsForChild( child, view );
			}
		}
		
		target.updateBinds( view );
	},
	
	onModelChange: function()
	{
		this.updateBindsForChild( this, this );
	},
	
});