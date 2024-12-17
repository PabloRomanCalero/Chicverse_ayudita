<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('status')->default('carrito');
            $table->string('type_payment')->nullable();
            $table->decimal('totalPrice')->nullable();
            $table->date('date')->nullable();
            $table->foreignId('user_id')->constrained(
                table:'users',indexName: 'OrderUsers'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('address_id')->nullable()->constrained(
                table:'addresses',indexName: 'OrderAddress'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
