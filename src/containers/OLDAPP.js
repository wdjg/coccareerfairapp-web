{this.props.browser.greaterThan.extraSmall && <Menu
	        onClick={this.handleMenuClick.bind(this)}
	        selectedKeys={[this.state.menu_current]}
	        mode="horizontal">
	        {this.renderMenuButtons(auth === undefined ? unregistered_buttons : (auth === "recruiter" ? recruiter_buttons : student_buttons))}
	      </Menu>}
				{this.props.browser.is.extraSmall && <SmoothCollapse
					expanded={this.state.show_navs}
					heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
					className="top-bar-hider">
					<TopBar buttons={top_buttons} onBurgerClick={() => this.setMenuState(true)} />
				</SmoothCollapse>}
				<div className="main">
					{this.props.browser.greaterThan.extraSmall && <div className="sidebar"></div>}
					<div className="content-container" ref={ref => {this.scroll_content = ref}}>
					
					</div>
				</div>
				{(this.props.user.user_type && this.props.browser.is.extraSmall) &&
					<SmoothCollapse
						expanded={this.state.show_navs}
						heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
						className="bottom-bar-hider">
						<nav className="bottom-nav">
							{this.renderBottomNavButtons(auth === "recruiter" ? recruiter_buttons : student_buttons)}
				  	</nav>
		  		</SmoothCollapse>}			
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
				<div 
					className={classNames("shade", {show: this.state.show_menu})}
					onClick={() => this.setMenuState(false)}></div>
				<div className={classNames("menu", {show: this.state.show_menu})}>
					
				</div>