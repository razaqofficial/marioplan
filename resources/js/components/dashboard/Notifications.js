import React from 'react';

const Notifications = ({notifications}) => {
	const notificationsList = notifications.length > 0 ? (
			notifications.map(notification => {
					return  (
						<li key={notification.id} className="collection-item avatar">
      						<i className="material-icons circle">notifications </i>
      						<span className="title">{ notification.title }</span>
      							<p> { notification.content } </p>
      					</li>	
					)				
			})
		) : (

            <li key="0" className="collection-item avatar">
                <i className="material-icons circle">notifications</i>
                <span className="title">No notification</span>
                <p> You have 0 notification.</p>
            </li>

		);
    return (
      <React.Fragment>
          <nav>
		    <div className="nav-wrapper">
		      <div className="col s12">
		        <a href="#!" className="breadcrumb">Notifications({notifications.length})</a>
		      </div>
		    </div>
		  </nav>
		  <ul className="collection">
		  	{ notificationsList }
		  </ul>
      </React.Fragment>
    );
};

export default Notifications
