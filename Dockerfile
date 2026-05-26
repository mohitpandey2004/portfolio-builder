FROM php:8.2-apache

# Linux dependencies aur PHP extensions (PostgreSQL + ZIP) install karna
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip

# Apache makkhan jaisa chale aur index.html ko default uthaye uski setting
RUN echo "DirectoryIndex index.html index.php" >> /etc/apache2/apache2.conf

# Saari files server par copy karna
COPY . /var/www/html/

# Permissions sahi karna taaki Zip generator folders me file write kar sake
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html