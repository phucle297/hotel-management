CREATE user 'slave_user' @'%' IDENTIFIED by 'password';

GRANT REPLICATION SLAVE ON *.* TO 'slave_user' @'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
